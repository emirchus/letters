import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInput } from "@/components/ui/sidebar";
import { Progress } from "./ui/progress";

export function NavQuotaCard() {
  return (
    <Card className="shadow-none">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm">Your free quota</CardTitle>
          <CardDescription>Subscribe to get more features</CardDescription>
        </CardHeader>
        <CardContent className="my-2">
          <Progress value={20} className="w-full" />
        </CardContent>
      </form>
    </Card>
  );
}
