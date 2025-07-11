import {
  Button,
  Input,
  LoadingOverlay,
  Callout,
  useMeshLocation,
} from "@uniformdev/mesh-sdk-react";
import {
  Fieldset,
  Heading,
  HorizontalRhythm,
  InputSelect,
  isValidUrl,
  VerticalRhythm,
} from "@uniformdev/design-system";

import type { NextPage } from "next";
import { useState } from "react";
import { IntegrationSettings } from "../lib";
import { DEFAULT_IFRAME_HEIGHT } from "../lib/constants";

type Message = {
  type: "success" | "error";
  title?: string;
  text: string;
};

const Settings: NextPage = () => {
  const { value, setValue } = useMeshLocation<
    "settings",
    IntegrationSettings
  >();

  const [settings, setSettings] = useState<IntegrationSettings>({
    srcUrl: value.srcUrl ?? "",
    initialHeight: value.initialHeight ?? DEFAULT_IFRAME_HEIGHT,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isValidSettings, setIsValidSettings] = useState(false);
  const [message, setMessage] = useState<Message | undefined>(undefined);

  const handleSaveClick = async () => {
    setIsProcessing(true);
    try {
      await setValue(() => ({
        newValue: settings,
      }));

      setMessage({
        type: "success",
        text: "Settings saved successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        title: "Unable to save settings.",
        text: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateSettings = (updates: Partial<IntegrationSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...updates,
    }));

    setMessage(undefined);

    if (updates.srcUrl !== undefined && isValidUrl(updates.srcUrl)) {
      setIsValidSettings(true);
    }
  };

  return (
    <VerticalRhythm gap="lg">
      <LoadingOverlay isActive={isProcessing} />
      <VerticalRhythm gap="lg">
        <Fieldset legend={<Heading level={3}>Umami dashboard URL</Heading>}>
          <Input
            id="srcUrl"
            name="srcUrl"
            label="Umami dashboard URL"
            placeholder="<insert Umami dashboard URL>"
            onChange={(e) => updateSettings({ srcUrl: e.target.value ?? "" })}
            value={settings?.srcUrl ?? ""}
          />
        </Fieldset>
        <Fieldset legend={<Heading level={3}>Display Settings</Heading>}>
          <Input
            id="initialHeight"
            name="initialHeight"
            label="Initial height (px) of the embedded Umami dashboard"
            type="number"
            min="300"
            onChange={(e) =>
              updateSettings({
                initialHeight: Number(e.target.value) || DEFAULT_IFRAME_HEIGHT,
              })
            }
            value={settings?.initialHeight ?? DEFAULT_IFRAME_HEIGHT}
          />
        </Fieldset>
      </VerticalRhythm>
      <HorizontalRhythm gap="base">
        <Button type="button" buttonType="secondary" onClick={handleSaveClick}>
          Save
        </Button>
      </HorizontalRhythm>
      {message && (
        <Callout title={message.title} type={message.type}>
          {message.text}
        </Callout>
      )}
    </VerticalRhythm>
  );
};

export default Settings;
