"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { uploadAvatar } from "@/app/supabase/upload-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useError } from "@/provider/errors-provider";
import { updateUser } from "../actions/update-user";

// import { submitOnboarding } from "./actions";

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [musicPreference, setMusicPreference] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [musicPlatform, setMusicPlatform] = useState("");

  const [isPending, startTransition] = useTransition();

  const { setError } = useError();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("musicPreference", musicPreference);
    formData.append("genres", JSON.stringify(genres));
    formData.append("musicPlatform", musicPlatform);

    startTransition(async () => {
      await Promise.all([updateUser(formData), avatar ? uploadAvatar(avatar) : Promise.resolve()]);

      router.push("/letters");
    });
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-8">
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">What&apos;s your name?</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <Button onClick={() => setStep(2)}>Next</Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Label>Upload your avatar</Label>
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar ? URL.createObjectURL(avatar) : ""} alt="Avatar" />
              <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Input
              title="Upload your avatar"
              type="file"
              accept="image/*"
              name="avatar"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file && file.size > 52428800) {
                  setError("Avatar is too large. Max size is 50MB.");
                  return;
                }
                setAvatar(file || null);
              }}
              className="w-full"
            />
          </div>
          <div className="flex justify-between">
            <Button onClick={() => setStep(1)} variant="outline">
              Back
            </Button>
            <Button onClick={() => setStep(3)}>Next</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <Label>How do you prefer to listen to music?</Label>
            <RadioGroup
              name="musicPreference"
              value={musicPreference}
              onValueChange={setMusicPreference}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="streaming" id="streaming" />
                <Label htmlFor="streaming">Streaming Services</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="download" id="download" />
                <Label htmlFor="download">Downloading</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="physical" id="physical" />
                <Label htmlFor="physical">Physical Media (CD, Vinyl)</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="musicPlatform">What&apos;s your preferred music platform?</Label>
            <Select value={musicPlatform} onValueChange={setMusicPlatform} name="musicPlatform">
              <SelectTrigger id="musicPlatform">
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spotify">Spotify</SelectItem>
                <SelectItem value="apple-music">Apple Music</SelectItem>
                <SelectItem value="youtube-music">YouTube Music</SelectItem>
                <SelectItem value="amazon-music">Amazon Music</SelectItem>
                <SelectItem value="tidal">Tidal</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>What genres do you enjoy? (Select all that apply)</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {["Rock", "Pop", "Hip-Hop", "Jazz", "Classical", "Electronic"].map(genre => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={genre}
                    checked={genres.includes(genre)}
                    onCheckedChange={checked => {
                      setGenres(checked ? [...genres, genre] : genres.filter(g => g !== genre));
                    }}
                  />
                  <Label htmlFor={genre}>{genre}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <Button onClick={() => setStep(2)} variant="outline">
              Back
            </Button>
            <Button disabled={isPending} type="submit">
              {isPending ? <Spinner className="bg-primary-foreground" /> : <></>} Complete Onboarding
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
