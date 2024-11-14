import { useState } from "react";
import { Button, ButtonProps } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export interface IButtonProps extends ButtonProps {
    onClick: () => Promise<void> | (() => void);
} 

export function AsyncButton({ onClick, ...props }: IButtonProps) {
    const [loading, setLoading] = useState<boolean>(false);

    async function handleOnPress() {
        setLoading(true);

        await onClick();

        setLoading(false);
    }

    return (
        <>
        <Button  disabled={loading} onClick={async () => await handleOnPress()} className={`${ loading ? " bg-[var(--red-lfa)]":"bg-[var(--red-lfa)]" } disabled:opacity-50 items-center justify-center `} {...props}>
            {
                loading ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                ) : (
                    <>{props.children}</>
                )
            }
        </Button>
        </>
    )
}