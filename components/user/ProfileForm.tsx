"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useUserDataStore } from '@/store/userDataStore'
import { useEffect, useState } from "react"
import Image from "next/image"
import { shimmerBlurDataUrl } from "@/utils/blurDataUrl"
import { useMutation, gql } from '@apollo/client';
import { UpdateUser } from "@/graphql/queries/GetUserData.gql"
import { useRouter } from "next/navigation"
import { PopoverClose } from "@radix-ui/react-popover"
const DeleteUser = gql`
    mutation DeleteUser($userId: String = "") {
        deleteUser(userId: $userId)
    }
`;

const profileFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    profile_photo: z.string().url({ message: "Please enter a valid URL." }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileForm() {
    const router = useRouter()
    const { userData } = useUserDataStore()
    const [deleteUser, { data: userDelete }] = useMutation(DeleteUser);
    const [updateUser, { data }] = useMutation(UpdateUser);
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: userData?.name || "",
            email: userData?.email || "",
            profile_photo: userData?.profile_photo || "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        form.reset({
            name: userData?.name,
            email: userData?.email,
            profile_photo: userData?.profile_photo,
        });
    }, [userData, form]);

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            const response = await updateUser({
                variables: {
                    name: data.name,
                    profile_photo: data.profile_photo,
                    userId: userData?.id,
                },
            });
            // console.log(response);
            toast("Profile Updated Successfully", {
                duration: 5000,
                style: {
                    backgroundColor: "#48BB78",
                    color: "#fff",
                },
                icon: "✓",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const [inputLoading, setInputLoading] = useState(false);
    const postImage = async (inputPic: any) => {
        setInputLoading(true);
        if (inputPic === undefined) {
            alert("Please Select an Image!");
            return;
        }
        if (inputPic.type === "image/jpeg" || inputPic.type === "image/png") {
            const data = new FormData();
            data.append("file", inputPic);
            data.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`);
            data.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`);
            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "post",
                body: data,
            });
            const imageData = await response.json();
            setInputLoading(false);
            return imageData.url.toString();
        } else {
            toast("Please Select an Image!", {
                duration: 5000,
                style: {
                    backgroundColor: "#e53e3e",
                    color: "#fff",
                },
                icon: "❕",
            })
            setInputLoading(false);
            return;
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row-reverse gap-3 items-start justify-center pb-[150px] sm:pb-10 sm:pt-5">
                <div className="w-full md:w-1/3 pt-7">
                    <FormField
                        control={form.control}
                        name="profile_photo"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormControl>
                                    <>
                                        <FormLabel className="sm:hidden">Profile Photo</FormLabel>
                                        <FormDescription className="sm:hidden">
                                            Click on the profile photo to upload a new one.
                                        </FormDescription>
                                        <div className="flex flex-col gap-3 justify-center items-center">
                                            <Label htmlFor="img-upload" className="group relative cursor-pointer">
                                                <Image
                                                    className="relative rounded-md flex justify-center items-center w-44 sm:w-24 aspect-square object-cover"
                                                    alt="image preview"
                                                    src={field?.value && field?.value !== "" ? field?.value : `data:image/${shimmerBlurDataUrl(100, 100)}`}
                                                    width={100}
                                                    height={100}
                                                    loading={"eager"}
                                                    placeholder={`data:image/${shimmerBlurDataUrl(100, 100)}`} />
                                                <span className="absolute  border-2 bottom-0 right-0 text-black bg-white rounded-full p-1 translate-y-3 group-hover:-translate-y-1 transition-all duration-1000 ease-in-out">
                                                    {!inputLoading ? <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M544 864V672h128L512 480L352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="2 4" stroke-dashoffset="6" d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"><animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0" /></path><path stroke-dasharray="30" stroke-dashoffset="30" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.3s" values="30;0" /></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M12 16v-7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0" /></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0" /></path></g></svg>}
                                                </span>
                                            </Label>
                                            <Input
                                                type="file"
                                                name="image"
                                                id="img-upload"
                                                className="hidden"
                                                accept=".jpeg, .png, .jpg"
                                                onChange={async (e) => {
                                                    const inputImage = await postImage(e.target.files?.[0]);
                                                    field.onChange(inputImage);
                                                }}
                                            />
                                            {inputLoading ? <FormDescription>
                                                uploading...
                                            </FormDescription> : null}
                                        </div>
                                        <p className="text-center">OR</p>
                                        <Input
                                            value={inputLoading ? null : field?.value}
                                            onChange={inputLoading && !field.value ? null : field.onChange}
                                            type="text"
                                            placeholder={inputLoading ? "please wait while we upload your image" : "Paste Image Link here"}
                                            required
                                            onFocus={(e) => e.target.select()}
                                            className="select-all"
                                        />
                                    </>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full flex flex-col space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name. It can be your real name or a pseudonym.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <Input disabled={true} {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={inputLoading || (form.watch().name === userData?.name && form.watch().profile_photo === userData?.profile_photo)} type="submit">{!inputLoading ? "Update profile" : <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5" /><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" /></path></svg>}</Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button disabled={inputLoading} variant={"destructive"}>{!inputLoading ? "Delete Acccount" : <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5" /><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" /></path></svg>}</Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-full h-full gap-5 p-10 z-[11111111111111]">
                            <p>Are you sure you want to delete your account?</p>
                            <Button
                                variant={"destructive"}
                                onClick={async () => {
                                    try {
                                        const response = await deleteUser({
                                            variables: {
                                                userId: userData?.id,
                                            },
                                        });
                                        if (response?.data?.deleteUser) {
                                            toast.success("Your account has been deleted.");
                                            router.push("/login");
                                        }
                                        else {
                                            toast.error("Something went wrong.");
                                        }
                                    } catch (error) {
                                        console.error(error);
                                        toast.error("Something went wrong.");
                                    }
                                }}
                            >
                                Yes, delete my account
                            </Button>
                            {/* <Button >No, keep my account</Button> */}
                        </PopoverContent>
                    </Popover>
                </div>
            </form>

        </Form>

    )
}