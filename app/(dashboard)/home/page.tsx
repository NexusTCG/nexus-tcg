import React from "react";
// Utils
import Image from "next/image";
// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Home() {
  return (
    <div
      id="home-page-container"
      className="
        flex
        flex-col
        md:flex-row
        justify-start
        items-start
        w-full
      "
    >
      <div
        id="home-content-container"
        className="
          flex
          flex-row
          justify-start
          items-start
          w-full
          px-4
          md:px-8
          py-4
          gap-4
        "
      >
        <div
          id="col-1"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-2/3
            gap-4
          "
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle >
                Latest cards
              </CardTitle>
            </CardHeader>
            <CardContent className="pr-0">
              <div
                className="
                  flex
                  flex-row
                  justify-start
                  items-start
                  gap-2
                  overflow-hidden
                "
              >
                <Image
                  src="/images/card-placeholder.png"
                  alt="Placeholder"
                  width={240}
                  height={336}
                />
                <Image
                  src="/images/card-placeholder.png"
                  alt="Placeholder"
                  width={240}
                  height={336}
                />
                <Image
                  src="/images/card-placeholder.png"
                  alt="Placeholder"
                  width={240}
                  height={336}
                />
                <Image
                  src="/images/card-placeholder.png"
                  alt="Placeholder"
                  width={240}
                  height={336}
                />
              </div>
              
            </CardContent>
            <CardFooter>
              <p>Footer</p>
            </CardFooter>
          </Card>
          <Card className="w-full">
              <CardHeader>
                <CardTitle>Home</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Welcome to the home page.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p>Footer</p>
              </CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Home</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Welcome to the home page.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p>Footer</p>
              </CardFooter>
            </Card>
        </div>
        <div
          id="col-1"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-1/3
            gap-4
          "
        >
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Home</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Welcome to the home page.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p>Footer</p>
              </CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Home</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Welcome to the home page.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p>Footer</p>
              </CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Home</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Welcome to the home page.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p>Footer</p>
              </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  )
}