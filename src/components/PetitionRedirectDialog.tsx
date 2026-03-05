import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PetitionRedirectDialog({ open, onOpenChange, mission }) {
  if (!mission) return null;

  const handleRedirect = () => {
    if (mission.petitionUrl) {
      window.open(mission.petitionUrl, "_blank");
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-white space-y-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Sign the Petition</DialogTitle>
        </DialogHeader>

        <p>
          This mission includes a petition you can sign to support the cause.
          You will be redirected to the petition page.
        </p>

        <Button className="w-full" onClick={handleRedirect}>
          Go to Petition
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
