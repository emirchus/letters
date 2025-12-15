import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";

export function NavQuotaCard() {
  return (
    <Card className="shadow-none">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm">Your free quota</CardTitle>
          <CardDescription>Subscribe to get more features</CardDescription>
        </CardHeader>
        <CardContent className="my-2">
          <Progress className="w-full" value={20} />
        </CardContent>
      </form>
    </Card>
  );
}
