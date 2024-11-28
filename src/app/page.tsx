import {
  ChartBarStacked,
  FileMusic,
  FileText,
  Languages,
  LetterText,
  MonitorSmartphone,
  PencilRuler,
} from "lucide-react";
import Link from "next/link";

import { ChordEditor } from "@/app/letters/components/text-editor";
import { AppSection } from "@/components/app-section";
import { StartWritingButton } from "@/components/start-writing-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditorContextProvider } from "@/provider/editor-provider";

const defaultText =
  "Creo que ella es mi Bette Davis del Sur\nVoy a hacerle una canción para que me de luz.\nPodemos hablar de lo que quieras\nde persianas y escaleras.";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full">
      <header className="container flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="/">
          <LetterText className="mr-2 h-6 w-6" />
          <span className="font-heading font-bold">Letters</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#pricing">
            Pricing
          </Link>
          {/* <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">
            Community
          </Link> */}
        </nav>
      </header>
      <main className="relative flex-1 before:absolute before:inset-0 before:-z-10 before:bg-[size:14px_24px] before:[background:radial-gradient(125%_125%_at_50%_10%,hsl(var(--background)/.2)_40%,hsl(var(--muted-foreground))_100%)]">
        <section className="relative before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(to_bottom,hsl(var(--muted-foreground)/.2)_1px,transparent_1px)] before:bg-[size:14px_24px] lg:h-[49.7vh]">
          <div className="container relative mx-auto h-full">
            <div className="relative grid h-full w-full grid-cols-1 items-center gap-x-8 overflow-hidden border-x p-6 lg:grid-cols-2 lg:px-12">
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
                <div className="relative mb-4 min-h-[28vh] flex-1 rounded-lg border bg-background/10 p-4 shadow-lg">
                  <EditorContextProvider
                    text={defaultText}
                    chords={{
                      4: "A",
                      10: "B",
                      19: "C",
                      45: "D",
                      55: "E",
                      60: "F",
                      65: "G",
                      70: "A#/A",
                    }}
                  >
                    <ChordEditor readonly className="select-none" />
                  </EditorContextProvider>
                  <div className="pointer-events-none absolute inset-0 z-50 bg-gradient-to-b from-transparent to-accent/40" />
                </div>
                <div className="flex flex-row items-center justify-end space-x-4">
                  <Button variant="outline">Learn More</Button> <StartWritingButton />
                </div>
              </div>
            </div>
          </div>
        </section>
        <AppSection title="Features" id="features">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
              <div className="flex flex-col items-center gap-y-2">
                <div className="rounded-lg bg-gradient-to-b from-primary to-primary/50 p-2 text-primary-foreground transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                  <ChartBarStacked className="h-6 w-6" />
                </div>
                <h2 className="text-balance text-center text-xl font-medium text-card-foreground">Simple Workflows</h2>
              </div>
              <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                Easily create and manage your letters with simple workflows.
              </p>
            </div>
            <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
              <div className="flex flex-col items-center gap-y-2">
                <div className="rounded-lg bg-gradient-to-b from-primary to-primary/50 p-2 text-primary-foreground transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                  <Languages className="h-6 w-6" />
                </div>
                <h2 className="text-balance text-center text-xl font-medium text-card-foreground">
                  Multi-Language Support
                </h2>
              </div>
              <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                Write in multiple languages with ease.
              </p>
            </div>
            <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
              <div className="flex flex-col items-center gap-y-2">
                <div className="rounded-lg bg-gradient-to-b from-primary to-primary/50 p-2 text-primary-foreground transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                  <PencilRuler className="h-6 w-6" />
                </div>
                <h2 className="text-balance text-center text-xl font-medium text-card-foreground">Tool Integration</h2>
              </div>
              <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                Send your letters to your favorite tools. <br /> Like CifraClub, LaCuerda, etc.
              </p>
            </div>
            <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
              <div className="flex flex-col items-center gap-y-2">
                <div className="rounded-lg bg-gradient-to-b from-primary to-primary/50 p-2 text-primary-foreground transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                  <MonitorSmartphone className="h-6 w-6" />
                </div>
                <h2 className="text-balance text-center text-xl font-medium text-card-foreground">Cross Platform</h2>
              </div>
              <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                Available on all platforms. Windows, MacOS, Linux, iOS, Android.
              </p>
            </div>
            <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
              <div className="flex flex-col items-center gap-y-2">
                <div className="rounded-lg bg-gradient-to-b from-primary to-primary/50 p-2 text-primary-foreground transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-balance text-center text-xl font-medium text-card-foreground">Exportable</h2>
              </div>
              <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                Design and customize your letters to fit your specific use case and requirements.
              </p>
            </div>
            <div className="md:[&amp;:nth-child(2n+1)]:border-r md:[&amp;:nth-child(n+5)]:border-b-0 lg:[&amp;:nth-child(3n)]:border-r-0 lg:[&amp;:nth-child(n+4)]:border-b-0 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r">
              <div className="flex flex-col items-center gap-y-2">
                <div className="rounded-lg bg-gradient-to-b from-primary to-primary/50 p-2 text-primary-foreground transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                  <FileMusic className="h-6 w-6" />
                </div>
                <h2 className="text-balance text-center text-xl font-medium text-card-foreground">
                  Efficient Execution
                </h2>
              </div>
              <p className="mx-auto max-w-md text-balance text-center text-sm text-muted-foreground">
                Optimize your letters with built-in efficiency and scalability features.
              </p>
            </div>
          </div>
        </AppSection>
        <section className="w-full bg-primary/50 py-12 text-primary-foreground md:py-24 lg:py-32">
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
                  <Button type="submit">Sign Up</Button>
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
        <div className="flex w-full flex-row items-center justify-between rounded-md border bg-secondary px-6 py-6 shadow">
          <p className="text-xs text-muted-foreground">© 2024 Letters. All rights reserved.</p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link className="text-xs underline-offset-4 hover:underline" href="/terms">
              Terms of Service
            </Link>
            <Link className="text-xs underline-offset-4 hover:underline" href="/privacy">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
