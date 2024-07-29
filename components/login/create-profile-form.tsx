"use client"

// Hooks
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
// Utils
import { createClient } from "@/app/utils/supabase/client";
import Image from "next/image";
import clsx from "clsx";
// Validation
import { ProfileDTO } from "@/app/lib/types/dto";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// Icons
import NexusIconWhite from "@/public/brand-assets/nexus-icon-white.svg";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  bio: z.string().max(160).optional(),
})

type FormValues = z.infer<typeof formSchema>

type CreateProfileFormProps = {
  initialProfile: ProfileDTO | null;
}

export default function CreateProfileForm({ 
  initialProfile 
}: CreateProfileFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: initialProfile?.username || "",
      bio: initialProfile?.bio || "",
    },
  })

  async function onSubmit(
    values: FormValues
  ) {
    console.log("values", values)
    console.log("initialProfile id:", initialProfile?.user_id)
    if (initialProfile?.user_id) {
      try {
        const { error } = await supabase.from('profiles').upsert({
          id: initialProfile.user_id,
          ...values,
        })
        if (error) {
          console.error('Error creating profile:', error)
        } else {
          console.log("Profile created successfully");
          router.push('/home')
        }
      } catch (error) {
        console.error('Error in onSubmit:', error)
      }
    } else {
      console.error('No user ID available')
    }
  }

  const avatarUrl = initialProfile?.avatar_url || '';
  const usernameFallback = form.watch('username').slice(0, 2).toUpperCase();

  return (
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
            <CardTitle className="text-xl font-medium">
              Create profile
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
                <AvatarImage src={avatarUrl} alt="Avatar" />
                <AvatarFallback className="text-neutral-500">
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
              Finish
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}