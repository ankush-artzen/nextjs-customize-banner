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
      setEditorUrl(`https://${app.config.shop}/admin/themes/current/editor?context=app`);
    }
  }, [app]);

  return (
    <Page title="Theme Extension">
      <Card>
        <div style={{ padding: '20px' }}>
          <Text as="p" variant="bodyMd">
            Open your stores Theme Editor directly to the section where your extension is installed.
          </Text>
          {editorUrl ? (
            <div style={{ marginTop: '16px' }}>
              <Link href={editorUrl} target="_blank">
                <Button>Open Theme Editor</Button>
              </Link>
            </div>
          ) : (
            <Button disabled>Loading...</Button>
          )}
        </div>
      </Card>
    </Page>
  );
}