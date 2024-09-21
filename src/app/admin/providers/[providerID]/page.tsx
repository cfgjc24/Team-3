import React from "react";

export default function Page({ params }: { params: { providerID: string } }) {
  return <div>My Provider: {params.providerID}</div>;
}
