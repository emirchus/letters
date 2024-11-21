import { LetterText, Music, PenTool, Share2, Text, Users } from "lucide-react";
import Link from "next/link";

import { ChordEditor } from "@/components/text-editor";
import { TextScramble } from "@/components/text-scramble";
import { Button } from "@/components/ui/button";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { Input } from "@/components/ui/input";
import { EditorContextProvider } from "@/provider/editor-provider";

const defaultText = "Creo que ella es mi Bette Davis del Sur\nVoy a hacerle una canción para que me de luz.\nPodemos hablar de lo que quieras\nde persianas y escaleras.";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full">
      {/* <div className="absolute bottom-0 left-0 right-0 top-0 "></div> */}
      <header className="container flex h-14 items-center px-4 lg:px-6">
        <Link href="/" className="flex items-center justify-center">
          <LetterText className="mr-2 h-6 w-6" />
          <span className="font-heading font-bold">Letters</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">
            Community
          </Link>
        </nav>
      </header>
      <main className="relative flex-1">
        <section className="before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(to_bottom,hsl(var(--muted-foreground)/.2)_1px,transparent_1px)] before:bg-[size:14px_24px]">
          <div className="container relative mx-auto h-full">
            <div className="relative grid w-full grid-cols-1 gap-x-8 overflow-hidden border-x p-6 lg:grid-cols-2 lg:p-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Write Songs, Add Chords, Share Your Music
                </h1>
                {/* <AnimatedGradientText /> */}
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Letters is the ultimate platform for songwriters. Create, collaborate, and share your music with ease.
                </p>
              </div>
              <div className="">
                <div className="mb-4 h-[200px] flex-1 overflow-auto rounded-lg border bg-background/50 p-2 shadow-lg">
                  <EditorContextProvider text={defaultText}>
                    <ChordEditor />
                  </EditorContextProvider>
                </div>
                <div className="flex flex-row items-center justify-end space-x-4">
                  <Button variant="outline">Learn More</Button>{" "}
                  <Button asChild>
                    <Link href="/letters" className="flex w-40 flex-row items-start justify-start">
                      <TextScramble className="mx-auto" as="span">
                        Start Writing
                      </TextScramble>
                      <PenTool className="ml-auto h-6 w-6" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="bg-background">
          <div className="container relative mx-auto">
            <div className="relative z-0 mx-auto overflow-hidden border-x border-t p-2 py-8 text-center md:p-12">
              <h2 className="tracking-tigh text-balance text-sm font-semibold uppercase text-muted-foreground">
                Features
              </h2>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 -z-10 h-full w-full bg-gradient-to-t from-background from-50% dark:from-background"></div>
              <FlickeringGrid
                className="absolute inset-0 -z-20 size-full bg-transparent"
                squareSize={4}
                gridGap={6}
                color="#6B7280"
                maxOpacity={0.5}
                flickerChance={0.1}
                height={800}
              />
            </div>
            <div className="border-x border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="rounded-lg bg-gradient-to-b from-primary to-primary/80 p-2 text-white transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                      <Text className="h-6 w-6" />
                    </div>
                    <h2 className="text-balance text-center text-xl font-medium text-card-foreground">
                      Simple Agent Workflows
                    </h2>
                  </div>
                  <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                    Easily create and manage AI agent workflows with intuitive APIs.
                  </p>
                  <a
                    className="text-sm text-primary underline-offset-4 transition-colors hover:text-secondary-foreground hover:underline"
                    href="#"
                  >
                    Learn more &gt;
                  </a>
                </div>
                <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="rounded-lg bg-gradient-to-b from-primary to-primary/80 p-2 text-white transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                      <Text className="h-6 w-6" />
                    </div>
                    <h2 className="text-balance text-center text-xl font-medium text-card-foreground">
                      Multi-Agent Systems
                    </h2>
                  </div>
                  <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                    Build complex systems with multiple AI agents working together.
                  </p>
                  <a
                    className="text-sm text-primary underline-offset-4 transition-colors hover:text-secondary-foreground hover:underline"
                    href="#"
                  >
                    Learn more &gt;
                  </a>
                </div>
                <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="rounded-lg bg-gradient-to-b from-primary to-primary/80 p-2 text-white transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                      <Text className="h-6 w-6" />
                    </div>
                    <h2 className="text-balance text-center text-xl font-medium text-card-foreground">
                      Tool Integration
                    </h2>
                  </div>
                  <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                    Seamlessly integrate external tools and APIs into your agent workflows.
                  </p>
                  <a
                    className="text-sm text-primary underline-offset-4 transition-colors hover:text-secondary-foreground hover:underline"
                    href="#"
                  >
                    Learn more &gt;
                  </a>
                </div>
                <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="rounded-lg bg-gradient-to-b from-primary to-primary/80 p-2 text-white transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                      <Text className="h-6 w-6" />
                    </div>
                    <h2 className="text-balance text-center text-xl font-medium text-card-foreground">
                      Cross-Language Support
                    </h2>
                  </div>
                  <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                    Available in all major programming languages for maximum flexibility.
                  </p>
                  <a
                    className="text-sm text-primary underline-offset-4 transition-colors hover:text-secondary-foreground hover:underline"
                    href="#"
                  >
                    Learn more &gt;
                  </a>
                </div>
                <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="rounded-lg bg-gradient-to-b from-primary to-primary/80 p-2 text-white transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                      <Text className="h-6 w-6" />
                    </div>
                    <h2 className="text-balance text-center text-xl font-medium text-card-foreground">
                      Customizable Agents
                    </h2>
                  </div>
                  <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                    Design and customize agents to fit your specific use case and requirements.
                  </p>
                  <a
                    className="text-sm text-primary underline-offset-4 transition-colors hover:text-secondary-foreground hover:underline"
                    href="#"
                  >
                    Learn more &gt;
                  </a>
                </div>
                <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="rounded-lg bg-gradient-to-b from-primary to-primary/80 p-2 text-white transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                      <Text className="h-6 w-6" />
                    </div>
                    <h2 className="text-balance text-center text-xl font-medium text-card-foreground">
                      Efficient Execution
                    </h2>
                  </div>
                  <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                    Optimize agent performance with built-in efficiency and scalability features.
                  </p>
                  <a
                    className="text-sm text-primary underline-offset-4 transition-colors hover:text-secondary-foreground hover:underline"
                    href="#"
                  >
                    Learn more &gt;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-primary py-12 text-primary-foreground md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Writing Your Next Song
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Join thousands of songwriters who are creating amazing music with SongScribe.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 text-primary" placeholder="Enter your email" type="email" />
                  <Button className="bg-primary-foreground text-primary" type="submit">
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-primary-foreground/60">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">© 2024 Letters. All rights reserved.</p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
