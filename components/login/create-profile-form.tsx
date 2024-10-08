"use client"

// Hooks
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
// Utils
import { createClient } from "@/app/utils/supabase/client";
import Image from "next/image";
import clsx from "clsx";
// Validation
import { UserProfileSchema } from "@/app/lib/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
// Components
import { 
  Form, 
  FormField, 
  FormItem, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// Icons
import NexusIconWhite from "@/public/brand-assets/nexus-icon-white.svg";

type FormValues = z.infer<typeof UserProfileSchema>

type CreateProfileFormProps = {
  userId: string | null | undefined;
  fullName: string | null | undefined;
  avatarUrl: string | null | undefined;
}

export default function CreateProfileForm({ 
  userId,
  fullName,
  avatarUrl, 
}: CreateProfileFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [firstName, ...lastNameParts] = (fullName || "").split(" ");
  const lastName = lastNameParts.join(" ");

  const form = useForm<FormValues>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      username: "",
      avatar_url: avatarUrl || "",
      bio: "",
      first_name: firstName || "",
      last_name: lastName || "",
    },
  })

  async function onSubmit(
    values: FormValues
  ) {
    setIsSubmitting(true)
    if (userId) {
      try {
        const { 
          error 
        } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            username: values.username,
            bio: values.bio,
            first_name: values.first_name,
            last_name: values.last_name,
            avatar_url: values.avatar_url,
          })
        if (error) {
          console.error('Error creating profile:', error)
          toast({
            title: "Error",
            description: "There was a problem creating your profile. Please try again.",
            variant: "destructive",
          })
        } else {
          console.log("Profile created successfully");
          toast({
            title: "Success!",
            description: "Your profile has been created. Redirecting you to the home page...",
          })
          setTimeout(() => router.push('/home'), 2000)
        }
      } catch (error) {
        console.error('Error in onSubmit:', error)
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
        toast({
          title: "Error",
          description: "No user ID available. Please try logging in again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    } else {
      console.error('No user ID available')
      setIsSubmitting(false)
    }
  }

  const usernameFallback = form.watch('username').slice(0, 2).toUpperCase();

  return (
    <>
      <Card 
        className="
          w-full
          bg-zinc-950
          border
          border-zinc-700
          shadow-xl 
          shadow-black/50
        "
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader
              className="
                flex 
                flex-row 
                justify-between 
                items-center 
                w-full
                border-b
                border-zinc-700
                py-4
              "
            >
              <Image
                src={NexusIconWhite}
                alt="Nexus TCG" 
                width={32} 
                height={32} 
              />
              <CardTitle className={clsx("text-xl font-medium", 
                  {
                    "text-lg": firstName !== ""
                  }
                )}
              >
                {firstName ? `Hi, ${firstName}! Create your profile` : "Create your profile"}
              </CardTitle>
            </CardHeader>
            <CardContent
              className="
                flex
                flex-col
                justify-start
                items-start
                w-full
                px-4
                py-6
                bg-zinc-900
                gap-6
              "
            >
              <div
                id="avatar-username-container"
                className="
                  flex
                  flex-row
                  justify-between
                  items-start
                  w-full
                  gap-4
                "
              >
                <Avatar
                  className="
                    w-[60px] 
                    h-[60px] 
                    border 
                    border-zinc-700
                  "
                >
                  {avatarUrl && (
                    <AvatarImage src={avatarUrl} alt="Avatar" />
                  )}
                  <AvatarFallback className={clsx("text-neutral-500", 
                      {
                        "text-neutral-300": usernameFallback.length > 1
                      }
                    )}
                  >
                    {usernameFallback}
                  </AvatarFallback>
                </Avatar>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <div
                        id="username-description-container"
                        className="
                          flex
                          flex-row
                          justify-between
                          items-center
                          w-full
                          gap-4
                        "
                      >
                        <FormDescription className="text-neutral-300">
                          Displayed on cards you make
                        </FormDescription>
                        <FormDescription
                          className={clsx("text-neutral-500",
                            {
                              "text-neutral-300": !form.formState.isValid
                            }
                          )}
                        >
                          Required
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        placeholder="Write a short bio"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <div
                      id="bio-description-container"
                      className="
                        flex
                        flex-row
                        justify-between
                        items-center
                        w-full
                        gap-4
                      "
                    >
                      <FormDescription className="text-neutral-300">
                        A short introduction about yourself
                      </FormDescription>
                      <FormDescription className="text-neutral-500">
                        Optional
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter
              className="
                flex
                flex-row
                justify-end
                items-center
                p-4
                border-t
                border-zinc-700
              "
            >
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                className="
                  text-lg
                  font-semibold
                  gap-2
                  bg-teal-400
                  hover:bg-teal-300
                  hover:shadow-lg
                  hover:shadow-teal-300/10
                  transition-all
                "
                onClick={() => { console.log("I was clicked") }}
              >
                {isSubmitting ? "Creating Profile..." : "Finish"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Toaster />
    </>
  )
}