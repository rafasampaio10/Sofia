/**
 * Client único de acesso ao backend do Sofia (webhook n8n).
 * Todos os módulos do portal (PDC, Betas, Conhecimento, Contorno, Chat) devem
 * usar `callSofiaAgent` em vez de montar suas próprias chamadas HTTP.
 *
 * O webhook aponta para um trigger dedicado ao portal que, por trás, invoca o
 * workflow "Sofia · Agente (completo)" (dV8wAbaAGHoD8lUo). Contrato de
 * request/response abaixo é um placeholder até a URL real e o payload
 * definitivo serem definidos no n8n.
 */

const SOFIA_WEBHOOK_URL = import.meta.env.VITE_SOFIA_WEBHOOK_URL;

export interface SofiaAgentRequest {
  query: string;
}

export interface SofiaAgentResponse {
  resposta: string;
  [key: string]: unknown;
}

export async function callSofiaAgent(query: string): Promise<SofiaAgentResponse> {
  const body: SofiaAgentRequest = { query };

  const response = await fetch(SOFIA_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Sofia agent respondeu ${response.status}: ${await response.text()}`);
  }

  return response.json() as Promise<SofiaAgentResponse>;
}
