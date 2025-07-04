"use client";

import { useEffect, useState } from "react";
import { Page, Card, Text, Button } from "@shopify/polaris";
import Link from "next/link";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function Home() {
  const [editorUrl, setEditorUrl] = useState("");

  const app = useAppBridge();

  useEffect(() => {
    if (app?.config?.shop) {
      setEditorUrl(
        `https://${app.config.shop}/admin/themes/current/editor?context=app`,
      );
    }
  }, [app]);

  return (
    <Page title="Theme Extension">
      <Card>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f9f9fc",
            borderRadius: "8px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Text as="p" variant="bodyMd">
              Please check Theme Editor directly to the section where extension
              customize banner extension is installed.
            </Text>
          </div>

          {editorUrl ? (
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link href={editorUrl} target="_blank">
                <Button>Open Theme Editor</Button>
              </Link>
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <Button disabled>Loading...</Button>
            </div>
          )}
        </div>
      </Card>
    </Page>
  );
}
