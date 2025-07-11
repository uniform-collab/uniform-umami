import { useMeshLocation } from "@uniformdev/mesh-sdk-react";
import type { NextPage } from "next";
import { IntegrationSettings } from "../lib";
import { VerticalRhythm } from "@uniformdev/design-system";
import { UmamiDashboard } from "../components/UmamiDashboard";

/** A tool that renders the Umami analytics dashboard in a full-page iframe */
const ProjectToolPage: NextPage = () => {
  return <UmamiDashboard />;
};

export default ProjectToolPage;
