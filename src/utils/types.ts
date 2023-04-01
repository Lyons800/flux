import { ChatCompletionResponseMessage } from "openai-streams";
import { Node, Edge } from "reactflow";

type FluxNodeData = {
  id?: string;
  x: number;
  y: number;
  fluxNodeType: FluxNodeType;
  text: string;
  generating: boolean;
  proCon?: "pro" | "con";
};

export enum FluxNodeType {
  System = "System",
  User = "User",
  GPT = "GPT",
  TweakedGPT = "GPT (tweaked)",
}

export type Settings = {
  defaultPreamble: string;
  autoZoom: boolean;
  model: string;
  temp: number;
  n: number;
  proCon: 'pro' | 'con' | null;
};


// The stream response is weird and has a delta instead of message field.
export interface CreateChatCompletionStreamResponseChoicesInner {
  index?: number;
  delta?: ChatCompletionResponseMessage;
  finish_reason?: string;
}

export type HistoryItem = {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  lastSelectedNodeId: string | null;
};
