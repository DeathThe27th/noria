"use client";

import { useState } from "react";

type EthereumProvider = { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> };

declare global { interface Window { ethereum?: EthereumProvider } }

export function WalletConnect({ compact = false }: { compact?: boolean }) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function connect() {
    setError("");
    if (!window.ethereum) { setError("Install a browser wallet to connect."); return; }
    setLoading(true);
    try {
      const chainId = String(await window.ethereum.request({ method: "eth_chainId" }));
      if (chainId !== "0x38") await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x38" }] });
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[];
      setAddress(accounts[0] ?? "");
    } catch { setError("Wallet connection was cancelled or BSC was unavailable."); }
    finally { setLoading(false); }
  }

  return <div className="flex flex-col items-end gap-2"><button type="button" onClick={connect} disabled={loading} className={compact ? "rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#123e82]" : "bg-[#251926] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5d315f]"}>{loading ? "Connecting…" : address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "Connect BSC wallet"}</button>{error && <p className="max-w-xs text-right text-xs text-[#765b24]">{error}</p>}</div>;
}
