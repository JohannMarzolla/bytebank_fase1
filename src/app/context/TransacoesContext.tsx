"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getSaldo, getTransacoes, postSaldo, postTransacao, putTransacoes } from "../services/transacoesServices";
import { useSession } from "next-auth/react";

interface Transacao {
  userId: number;
  tipoTransacao: string;
  valor: number;
  date: string;
}

interface TransacoesContextData {
  transacoes: Transacao[];
  saldo: number;
  deposito: (number: number) => Promise<void>;
  transferencia: (number: number) => Promise<void>;
  novaTransacao: (
    tipoTransacao: string, valor: number, date: string, userId: number) => Promise<void>;
  atualizarTransacao: any;
}

const TransacoesContext = createContext<TransacoesContextData | undefined>(undefined);

export function TransacoesProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  console.log('session context ',session);
  const user = session?.user as any || {};
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [saldo, setSaldo] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchData = async () => {
        try {
          const [saldoResult, transacoesResult] = await Promise.allSettled([
            getSaldo(session.user.id),
            getTransacoes(session.user.id),
          ]);

          if (saldoResult.status === "fulfilled") setSaldo(saldoResult.value);
          if (transacoesResult.status === "fulfilled") setTransacoes(transacoesResult.value);
        } catch (error) {
          console.error("Erro ao buscar dados no servidor:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [session]);

  const atualizarSaldo = async () => {
    try {
      if (!user?.id) return;
      const saldoAtualizado = await getSaldo(user.id);
      setSaldo(saldoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar saldo:", error);
    }
  };

  const atualizaTransacoes = async () => {
    try {
      if (!user?.id) return;
      const transacoesAtualizadas = await getTransacoes(user.id);
      setTransacoes(transacoesAtualizadas);
    } catch (error) {
      console.log("Erro ao atualizar as transações", error);
    }
  };

  const deposito = async (valor: number) => {
    try {
      if (!user?.id) throw new Error("Usuário não autenticado.");
      const novoSaldo = saldo + valor;
      await postSaldo(user.id, novoSaldo);
      await atualizarSaldo();
    } catch (error) {
      console.error("Erro ao realizar depósito:", error);
    }
  };

  const transferencia = async (valor: number) => {
    try {
      if (!user?.id) throw new Error("Usuário não autenticado.");
      const novoSaldo = saldo - valor;
      await postSaldo(user.id, novoSaldo);
      await atualizarSaldo();
    } catch (error) {
      console.error("Erro ao realizar transferência:", error);
    }
  };

  const novaTransacao = async (tipoTransacao: string, valor: number, date: string, userId: number) => {
    const transacao: Transacao = { userId, tipoTransacao, valor, date };
    await postTransacao(transacao);
    await atualizaTransacoes();
    setTransacoes((prevTransacoes) => [...prevTransacoes, transacao]);
  };

  const atualizarTransacao = async (transacaoId: number, tipoTransacao: string, valor: number, date: string) => {
    try {
      if (!user?.id) throw new Error("Usuário não autenticado.");
      const transacaoAtualizada = { transacaoId, tipoTransacao, valor, date };
      await putTransacoes(transacaoAtualizada);
      await atualizaTransacoes();
    } catch (error) {
      console.error("Erro ao atualizar a transação:", error);
    }
  };

  return (
    <TransacoesContext.Provider
      value={{ transacoes, saldo, deposito, transferencia, novaTransacao, atualizarTransacao }}
    >
      {children}
    </TransacoesContext.Provider>
  );
}

export function useTransacoesContext() {
  const context = useContext(TransacoesContext);
  if (!context) {
    throw new Error("useTransacoesContext deve ser usado dentro de um TransacoesProvider");
  }
  return context;
}

