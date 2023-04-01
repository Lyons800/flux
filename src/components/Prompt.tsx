import { useEffect, useRef, useState } from "react";

import {
  Node,
} from "reactflow";

import {
  Spinner, Text, Box, Button,
  ButtonGroup,
} from "@chakra-ui/react";

import TextareaAutosize from "react-textarea-autosize";

import { getFluxNodeTypeColor, getFluxNodeTypeDarkColor } from "../utils/color";
import { FluxNodeData, FluxNodeType, Settings } from "../utils/types";
import { displayNameFromFluxNodeType } from "../utils/fluxNode";
import { LabeledSlider } from "./utils/LabeledInputs";
import { Row, Center } from "../utils/chakra";
import { BigButton } from "./utils/BigButton";

export function Prompt({
  lineage,
  submitPrompt,
  onType,
  selectNode,
  newConnectedToSelectedNode,
  isGPT4,
  settings,
  setSettings,
}: {
  lineage: Node<FluxNodeData>[];
  onType: (text: string) => void;
  submitPrompt: () => Promise<void>;
  selectNode: (id: string) => void;
  newConnectedToSelectedNode: (type: FluxNodeType) => void;
  isGPT4: boolean;
  settings: Settings;
  setSettings: (settings: Settings) => void;
}) {

  const setProCon = (value: "pro" | "con") => {
    setSettings({ ...settings, proCon: value });
  };

  const promptNode = lineage[0];

  const promptNodeType = promptNode.data.fluxNodeType;

  const onMainButtonClick = () => {
    if (promptNodeType === FluxNodeType.User) {
      submitPrompt();
    } else {
      newConnectedToSelectedNodeWithType(FluxNodeType.User);
    }
  };

  const newConnectedToSelectedNodeWithType = (type: FluxNodeType, proCon: 'pro' | 'con' | null, opinion: string) => {
    const opinionInput = document.getElementById("opinionInput") as HTMLTextAreaElement;
    const opinionText = opinionInput.value.trim(); // Get the value of the input and remove leading/trailing whitespace
   

    if (opinionText) { // Only create a new node if there is input in the opinion text area
      newConnectedToSelectedNode(type, settings.proCon, opinion);
      
      opinionInput.value = ""; // Clear the input field
      
    }
    
    else {
      // newConnectedToSelectedNode(type, settings.proCon);
      
    }
  
  };
  /*//////////////////////////////////////////////////////////////
                              EFFECTS
  /////////////////////////////////////////////////////////////*/

  const textOffsetRef = useRef<number>(-1);

  // Scroll to the prompt buttons
  // when the bottom node is swapped.
  useEffect(() => {
    window.document
      .getElementById("promptButtons")
      ?.scrollIntoView(/* { behavior: "smooth" } */);

    const promptBox = window.document.getElementById(
      "promptBox"
    ) as HTMLTextAreaElement | null;

    // Focus the text box and move the cursor to chosen offset (defaults to end).
    promptBox?.setSelectionRange(textOffsetRef.current, textOffsetRef.current);
    promptBox?.focus();

    // Default to moving to the start of the text.
    textOffsetRef.current = -1;
  }, [promptNode.id]);

  const [opinion, setOpinion] = useState("");



  /*//////////////////////////////////////////////////////////////
                              APP
  /////////////////////////////////////////////////////////////*/

  return (
    <>
      {lineage
        .slice()
        .reverse()
        .map((node, i) => {
          const isLast = i === lineage.length - 1;

          const data = node.data;

          const proConValue = data.fluxNodeType === FluxNodeType.User ? settings.proCon : data.proCon;


          return (
            <Row
              mb={2}
              p={3}
              whiteSpace="pre-wrap" // Preserve newlines.
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              borderRadius="6px"
              borderLeftWidth={isLast ? "4px" : "0px"}
              borderColor={getFluxNodeTypeDarkColor(data.fluxNodeType, data.proCon)}
              bg={getFluxNodeTypeColor(data.fluxNodeType, data.proCon)}
              key={node.id}
              onClick={
                !isLast
                  ? () => {
                    const selection = window.getSelection();

                    // We don't want to trigger the selection
                    // if they're just selecting/copying text.
                    if (selection?.isCollapsed) {
                      textOffsetRef.current = selection.anchorOffset ?? 0;

                      selectNode(node.id);
                    }
                  }
                  : undefined
              }
              cursor={!isLast ? "pointer" : "default"}
            >
              {data.generating && data.text === "" ? (
                <Center expand>
                  <Spinner />
                </Center>
              ) : (
                <>
                  <Text fontWeight="bold" width="auto" whiteSpace="nowrap">
                    {displayNameFromFluxNodeType(data.fluxNodeType)}
                    :&nbsp;
                  </Text>
                  {isLast ? (
                    <TextareaAutosize
                      id="promptBox"
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      value={data.text ?? ""}
                      onChange={(e) => onType(e.target.value)}
                      placeholder={
                        data.fluxNodeType === FluxNodeType.User
                          ? "Give your opinion here"
                          : data.fluxNodeType === FluxNodeType.System
                            ? "You are ChatGPT..."
                            : undefined
                      }
                    />
                  ) : (
                    data.text
                  )}
                </>
              )}
            </Row>
          );
        })}
      <Row
        mainAxisAlignment="center"
        crossAxisAlignment="stretch"
        width="100%"
        height="100px"
        id="promptButtons"
      >
        <Box flexGrow={1}>
          <ButtonGroup size="sm" isAttached>
            <Button
              colorScheme={settings.proCon === "pro" ? "green" : "gray"}
              onClick={() => setProCon("pro")}
            >
              Pro
            </Button>
            <Button
              colorScheme={settings.proCon === "con" ? "red" : "gray"}
              onClick={() => setProCon("con")}
            >
              Con
            </Button>
          </ButtonGroup>
        </Box>
      </Row>

      <TextareaAutosize
        id="opinionInput"
        style={{
          flexGrow: 1,
          padding: "8px",
          marginRight: "16px",
          borderRadius: "4px",
          fontSize: "lg",
        }}
        placeholder="Enter your opinion here"
        onChange={(e) => setOpinion(e.target.value)}
      />

      <Row
        mainAxisAlignment="center"
        crossAxisAlignment="stretch"
        width="100%"
        height="100px"
        id="promptButtons"
      >

        <BigButton
          tooltip={promptNodeType === FluxNodeType.User ? "⌘⏎" : "⌘P"}

          onClick={() => newConnectedToSelectedNodeWithType(FluxNodeType.User, settings.proCon, opinion)}
          color={getFluxNodeTypeDarkColor(FluxNodeType.User)}
          width="100%"
          height="100%"
          fontSize="lg"
        >
          Give Opinion
        </BigButton>

      </Row>

      <Row
        mainAxisAlignment="center"
        crossAxisAlignment="stretch"
        width="100%"
        height="100px"
        id="promptButtons"
      >
        <BigButton
          tooltip={promptNodeType === FluxNodeType.User ? "⌘⏎" : "⌘P"}
          onClick={onMainButtonClick}
          color={getFluxNodeTypeDarkColor(promptNodeType)}
          width="100%"
          height="100%"
          fontSize="lg"
        >
          {promptNodeType === FluxNodeType.User ? "Generate" : "Compose"}
          <Text fontWeight="extrabold">
            &nbsp;
            {promptNodeType === FluxNodeType.User
              ? displayNameFromFluxNodeType(FluxNodeType.GPT, isGPT4)
              : displayNameFromFluxNodeType(FluxNodeType.User, isGPT4)}
          </Text>
          response
        </BigButton>
      </Row>

      {promptNodeType === FluxNodeType.User ? (
        <>
          <LabeledSlider
            mt={3}
            label="Temperature (randomness)"
            value={settings.temp}
            setValue={(v) => setSettings({ ...settings, temp: v })}
            color={getFluxNodeTypeDarkColor(FluxNodeType.User)}
            max={1.25}
            min={0}
            step={0.01}
          />

          <LabeledSlider
            mt={3}
            label="Number of Responses"
            value={settings.n}
            setValue={(v) => setSettings({ ...settings, n: v })}
            color={getFluxNodeTypeDarkColor(FluxNodeType.User)}
            max={10}
            min={1}
            step={1}
          />
        </>
      ) : null}
    </>
  );
}
