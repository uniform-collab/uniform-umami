# Uniform Umami

A Uniform Mesh integration that embeds and displays an Umami analytics dashboard directly within the Uniform dashboard.

## Overview

This integration allows teams to access their Umami analytics dashboard directly from the Uniform interface, streamlining analytics review and project insights.

## Features

- Pulls data from Umami API and displays it in the Uniform in a project tool

## Installation

### Prerequisites

- A Uniform team and project
- An Umami analytics instance accessible via URL

### Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Deploy the integration to your Uniform team:
   ```
   npm run register-to-team
   ```
4. Install the integration on your project:
   ```
   npm run install-to-project
   ```

## Local development

To run the integration locally:

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Access the integration at `http://localhost:9000`

## Configuration

After installation, configure the integration in the Uniform dashboard:

1. Go to Project → Integrations
2. Find the Umami integration and click on its settings
3. Enter the URL of your Umami dashboard
4. Save the settings

## Tech stack

- Next.js
- React
- Uniform Mesh SDK
- TypeScript

## Disclaimer

This is example code provided for demonstration purposes only. It is provided "as is" without warranty of any kind, express or implied. Use at your own risk. The author or Uniform do not guarantee the functionality, security, or suitability of this code for any purpose.



