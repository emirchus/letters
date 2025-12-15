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

import {ChordEditor} from "@/app/letters/(editor)/components/text-editor";
import {AppSection} from "@/components/app-section";
import {StartWritingButton} from "@/components/start-writing-button";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {EditorContextProvider} from "@/provider/editor-provider";

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
          <div className="relative container mx-auto h-full">
            <div className="relative grid h-full w-full grid-cols-1 items-center gap-x-8 overflow-hidden border-x p-6 lg:grid-cols-2 lg:px-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Write Songs, Add Chords, Share Your Music
                </h1>
                {/* <AnimatedGradientText /> */}
                <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                  Letters is the ultimate platform for songwriters. Create, collaborate, and share
                  your music with ease.
                </p>
              </div>
              <div className="">
                <div className="bg-background/10 relative mb-4 min-h-[28vh] flex-1 rounded-lg border p-4 shadow-lg">
                  <EditorContextProvider
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
                    text={defaultText}
                  >
                    <ChordEditor readonly className="select-none" />
                  </EditorContextProvider>
                  <div className="to-accent/40 pointer-events-none absolute inset-0 z-50 bg-gradient-to-b from-transparent" />
                </div>
                <div className="flex flex-row items-center justify-end space-x-4">
                  <Button variant="outline">Learn More</Button> <StartWritingButton />
                </div>
              </div>
            </div>
          </div>
        </section>
        <AppSection id="features" title="Features">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="hover:bg-secondary/20 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 lg:border-r md:[&:nth-child(2n+1)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0 md:[&:nth-child(n+5)]:border-b-0">
              <div className="flex flex-col items-center gap-y-2">
                <div className="from-primary to-primary/50 text-primary-foreground group-hover:from-secondary group-hover:to-secondary/80 rounded-lg bg-gradient-to-b p-2 transition-colors">
                  <ChartBarStacked className="h-6 w-6" />
                </div>
                <h2 className="text-card-foreground text-center text-xl font-medium text-balance">
                  Simple Workflows
                </h2>
              </div>
              <p className="text-muted-foreground mx-auto max-w-md text-center text-sm text-balance">
                Easily create and manage your letters with simple workflows.
              </p>
            </div>
            <div className="hover:bg-secondary/20 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 lg:border-r md:[&:nth-child(2n+1)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0 md:[&:nth-child(n+5)]:border-b-0">
              <div className="flex flex-col items-center gap-y-2">
                <div className="from-primary to-primary/50 text-primary-foreground group-hover:from-secondary group-hover:to-secondary/80 rounded-lg bg-gradient-to-b p-2 transition-colors">
                  <Languages className="h-6 w-6" />
                </div>
                <h2 className="text-card-foreground text-center text-xl font-medium text-balance">
                  Multi-Language Support
                </h2>
              </div>
              <p className="text-muted-foreground mx-auto max-w-md text-center text-sm text-balance">
                Write in multiple languages with ease.
              </p>
            </div>
            <div className="hover:bg-secondary/20 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 lg:border-r md:[&:nth-child(2n+1)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0 md:[&:nth-child(n+5)]:border-b-0">
              <div className="flex flex-col items-center gap-y-2">
                <div className="from-primary to-primary/50 text-primary-foreground group-hover:from-secondary group-hover:to-secondary/80 rounded-lg bg-gradient-to-b p-2 transition-colors">
                  <PencilRuler className="h-6 w-6" />
                </div>
                <h2 className="text-card-foreground text-center text-xl font-medium text-balance">
                  Tool Integration
                </h2>
              </div>
              <p className="text-muted-foreground mx-auto max-w-md text-center text-sm text-balance">
                Send your letters to your favorite tools. <br /> Like CifraClub, LaCuerda, etc.
              </p>
            </div>
            <div className="hover:bg-secondary/20 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 lg:border-r md:[&:nth-child(2n+1)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0 md:[&:nth-child(n+5)]:border-b-0">
              <div className="flex flex-col items-center gap-y-2">
                <div className="from-primary to-primary/50 text-primary-foreground group-hover:from-secondary group-hover:to-secondary/80 rounded-lg bg-gradient-to-b p-2 transition-colors">
                  <MonitorSmartphone className="h-6 w-6" />
                </div>
                <h2 className="text-card-foreground text-center text-xl font-medium text-balance">
                  Cross Platform
                </h2>
              </div>
              <p className="text-muted-foreground mx-auto max-w-md text-center text-sm text-balance">
                Available on all platforms. Windows, MacOS, Linux, iOS, Android.
              </p>
            </div>
            <div className="hover:bg-secondary/20 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 lg:border-r md:[&:nth-child(2n+1)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0 md:[&:nth-child(n+5)]:border-b-0">
              <div className="flex flex-col items-center gap-y-2">
                <div className="from-primary to-primary/50 text-primary-foreground group-hover:from-secondary group-hover:to-secondary/80 rounded-lg bg-gradient-to-b p-2 transition-colors">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-card-foreground text-center text-xl font-medium text-balance">
                  Exportable
                </h2>
              </div>
              <p className="text-muted-foreground mx-auto max-w-md text-center text-sm text-balance">
                Design and customize your letters to fit your specific use case and requirements.
              </p>
            </div>
            <div className="hover:bg-secondary/20 flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors last:border-b-0 lg:border-r md:[&:nth-child(2n+1)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0 md:[&:nth-child(n+5)]:border-b-0">
              <div className="flex flex-col items-center gap-y-2">
                <div className="from-primary to-primary/50 text-primary-foreground group-hover:from-secondary group-hover:to-secondary/80 rounded-lg bg-gradient-to-b p-2 transition-colors">
                  <FileMusic className="h-6 w-6" />
                </div>
                <h2 className="text-card-foreground text-center text-xl font-medium text-balance">
                  Efficient Execution
                </h2>
              </div>
              <p className="text-muted-foreground mx-auto max-w-md text-center text-sm text-balance">
                Optimize your letters with built-in efficiency and scalability features.
              </p>
            </div>
          </div>
        </AppSection>
        <section className="bg-primary/50 text-primary-foreground w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Writing Your Next Song
                </h2>
                <p className="text-primary-foreground/80 mx-auto max-w-[600px] md:text-xl">
                  Join thousands of songwriters who are creating amazing music with SongScribe.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="text-primary max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-primary-foreground/60 text-xs">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <div className="bg-secondary flex w-full flex-row items-center justify-between rounded-md border px-6 py-6 shadow">
          <p className="text-muted-foreground text-xs">© 2024 Letters. All rights reserved.</p>
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
