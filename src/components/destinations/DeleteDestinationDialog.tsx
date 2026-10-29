'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { getTokenFromClient } from "@/lib/getTokenClient";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

const DeleteDestinationDialog = ({_id}: {_id: string | undefined}) => {

    const handleDelete = async () => {
        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/destinations/${_id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
            });
            const resData = await res.json();
            console.log(resData);
            if(resData.deletedCount > 0){
                redirect('/destinations');
            }

    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger render={
                    <Button className="inline-flex items-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50">
                        <Trash2 className="size-4" aria-hidden="true" />
                        Delete
                    </Button>
                } />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction><Button onClick={handleDelete}>Confirm</Button></AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteDestinationDialog;