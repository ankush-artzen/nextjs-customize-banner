"use client";

import { useEffect, useState } from "react";
import {
  Page,
  Layout,
  LegacyCard as Card,
  Text,
  Button,
  InlineStack,
  Divider,
  MediaCard,
} from "@shopify/polaris";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { graphql } from "@/lib/gql";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useGraphQL } from "./hooks/useGraphQL";

const GET_SHOP = graphql(`
  query getShop {
    shop {
      name
    }
  }
`);

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [editorurl, setEditorurl] = useState("");
  const router = useRouter();
  const app = useAppBridge();

  const {
    data: graphqlData,
    isLoading: graphqlLoading,
    error: graphqlError,
  } = useGraphQL(GET_SHOP);

  useEffect(() => {
    if (!app) return;
    setIsMounted(true);

    const shop = app.config?.shop;
    if (!shop) return;

    const url = `https://${shop}/admin/themes/current/editor?context=app`;
    setEditorurl(url);
  }, [app]);

  return (
    <Page title="Shopify App Dashboard">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-200 via-blue-300 to-purple-300 p-4 rounded-xl shadow text-gray-800 text-center mb-4">
        <h1 className="text-2xl font-semibold">Welcome to your Admin Panel</h1>
        <p className="text-sm mt-1">Built with ❤️ using Shopify & Next.js</p>
      </div>

      {/* Getting Started MediaCard */}
      <Layout.Section>
        <MediaCard
          title="Getting Started"
          description="Discover how Shopify can power up your entrepreneurial journey."
          primaryAction={{
            content: "Learn More",
            onAction: () => {
              window.open("https://shopify.dev", "_blank");
            },
          }}
          popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
        >
          <div style={{ width: "100%", height: 200, position: "relative" }}>
            <Image
              src="https://burst.shopifycdn.com/photos/one-arm-push-up.jpg?width=1200"
              alt="Business woman smiling"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </MediaCard>
      </Layout.Section>

      {/* App Insights */}
      <Layout.Section>
        <Card title="📊 App Insights Overview" sectioned>
          <div className="bg-gradient-to-r from-green-200 via-blue-300 to-purple-300 p-4 rounded-xl shadow text-gray-800">
            <div className="mb-3">
              <Text variant="bodyMd" as="p">
                Here’s a quick snapshot of your app activity.
              </Text>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                🚀 <strong>Shop:</strong>{" "}
                {graphqlData?.shop?.name ? graphqlData.shop.name : "Loading..."}
              </li>
              <li>
                📦 Version: <strong>v1.0.0</strong>
              </li>
            </ul>
          </div>
        </Card>
      </Layout.Section>

      {/* SEO MediaCard */}
      <Layout.Section>
        <MediaCard
          title="Boost your product visibility"
          description="Enable SEO tags, add beautiful images, and highlight special offers to increase conversions."
          primaryAction={{
            content: "Optimize Now",
            onAction: () => router.push("/products"),
          }}
          popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
        >
          <div style={{ width: "100%", height: 200, position: "relative" }}>
            <Image
              src="https://burst.shopifycdn.com/photos/resting-on-basketball-court.jpg?width=500"
              alt="Product promo image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </MediaCard>
      </Layout.Section>

      {/* Theme Editor Link */}
      <Layout.Section>
        <Card title="Customize Your Theme Extension" sectioned>
          <div className="mb-4">
            <Text as="p" variant="bodyMd">
              Open your store’s Theme Editor directly to the section where your
              extension is installed.
            </Text>
          </div>

          {isMounted && editorurl ? (
            <div className="flex justify-center">
              <Link href={editorurl} target="_blank">
                <Button>Open Theme Editor</Button>
              </Link>
            </div>
          ) : (
            <Button disabled>Loading...</Button>
          )}
        </Card>
      </Layout.Section>

      {/* Navigation */}
      <Layout.Section>
        <Card title="Navigation" sectioned>
          <InlineStack gap="200" align="start">
            <Text as="p">Explore another page using Next.js routing.</Text>
            <Link
              className="text-indigo-600 hover:underline font-medium"
              href="/new"
            >
              Go to /new page →
            </Link>
          </InlineStack>
        </Card>
      </Layout.Section>
    </Page>
  );
}
