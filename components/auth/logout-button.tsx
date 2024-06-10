"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

const LogoutButton = ({ children }: Props) => {
	const route = useRouter()
	return (
		// biome-ignore lint: reason
		<div
			onClick={async () => {
				await signOut();
				route.push("/")
			}}
		>
			{children}
		</div>
	);
};

export default LogoutButton;
