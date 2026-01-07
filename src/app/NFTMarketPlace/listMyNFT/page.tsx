'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NFTMarketPlaceJson from "@/contracts/NFTMarketPlace.json";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, type BaseError } from "wagmi";
import { useAppKitAccount } from "@reown/appkit/react";
import { parseUnits } from "viem";

const formSchema = z.object({
  NFTName: z.string().min(2, {
    message: "NFT Name must be at least 2 characters.",
  }),
  NFTDescription: z.string().min(5, {
    message: "NFT Description must be at least 5 characters.",
  }),
  price: z.number().min(0.01, {
    message: "Price must be at least 0.01.",
  }),
  imageUrl: z.string().url({
    message: "Image must be a valid URL.",
  }),
})

export default function ListMyNFTPage() {
  const {address, isConnected} = useAppKitAccount();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NFTName: "",
      NFTDescription: "",
      price: 0.01,
      imageUrl: "",
    },
  })

  const listingPrice = useReadContract({
      abi: NFTMarketPlaceJson.abi,
      address: process.env.NEXT_PUBLIC_NFTMARKET_ADDRESS as `0x${string}`,
      functionName: "getListPrice",
      query: {
        enabled: isConnected,
      }
    });
  console.log('listMyNFT listingPrice = ', listingPrice);

  useEffect(() => {
    if (url) {
      form.setValue("imageUrl", url);
    }
  }, [url, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("listMyNFT onSubmit values = ", values)
    const data = new FormData();
    data.set("name", values.NFTName);
    data.set("description", values.NFTDescription);
    // data.set("price", values.price.toString());
    data.set("imageUrl", values.imageUrl);
    // console.log("listMyNFT onSubmit data entries = ", Array.from(data.entries()));
    const uploadRequest = await fetch("/api/upload-metadata", {
      method: "POST",
      body: data,
    });
    console.log("listMyNFT onSubmit uploadRequest = ", uploadRequest);
    const res = await uploadRequest.json();
    console.log("listMyNFT onSubmit res = ", res);
    if (res?.code === 500) {
      alert(res.error);
      return;
    } else if (res?.code === 200) {
      const metadataUrl = res.data.url;
      const priceValue = parseUnits(form.getValues("price").toString(), 18);
      const listingPriceValue = BigInt(listingPrice.data?.toString() || "0");
      writeContract({
        address: process.env.NEXT_PUBLIC_NFTMARKET_ADDRESS as `0x${string}`,
        abi: NFTMarketPlaceJson.abi,
        functionName: 'createToken',
        args: [metadataUrl, priceValue],
        value: listingPriceValue,
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("listMyNFT handleChange e = ", e);
    console.log("listMyNFT handleChange file = ", e.target?.files?.[0]);
    setFile(e.target?.files?.[0]);
  };

  const uploadFile = async () => {
    console.log("listMyNFT uploadFile file = ", file);
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/upload-image", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      console.log("listMyNFT uploadFile signedUrl = ", signedUrl);
      setUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log("listMyNFT uploadFile error e = ", e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="w-[500px] mt-[80px] ml-[-500px] p-[20px]! shadow-2xl!">
        <CardHeader>
          <CardTitle className="text-purple-600">Upload Your NFT to NFTMarketPlace</CardTitle>
          <CardDescription>
            Enter your NFT information below to upload your NFT to NFTMarketPlace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-[25px]">
              <FormField
                control={form.control}
                name="NFTName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-600">NFT Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your NFT Name" className="p-[5px]!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="NFTDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-600">NFT Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your NFT Description" className="p-[5px]!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-600">Price(in ETH)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your price" className="p-[5px]!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-600">Upload Image(&lt;500 KB)</FormLabel>
                    <FormControl>
                      <div>
                        <input 
                          type="file" 
                          onChange={handleChange} 
                        />
                        <Button disabled={uploading} onClick={uploadFile} >
                          {uploading ? "Uploading..." : "Upload"}
                        </Button>
                        {url && <img src={url} alt="Image from Pinata" />}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="mt-[40px]! mb-10! bg-purple-600! text-white! font-bold! border-none!">
                List NFT {isPending ? "Confirming..." : "Mint"}
                </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div>
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && (
              <div className="text-red-500">
                Error: {(error as BaseError).shortMessage || error.message}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}