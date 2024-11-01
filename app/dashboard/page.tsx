"use client";
// 1:56:31
import { Activity, Clock, Cpu, GitBranch, Globe, Layout, LayoutTemplate, Loader2, Rocket, Search } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


type Webpage = {
    webpages: {
      id: number;
      domain: string;
      cid: string;
      name: string | null;
    };
    deployments: {
      id: number;
      deploymentUrl: string;
      deployedAt: Date | null;
      transactionHash: string;
    } | null;
  };

export default function Dashboard() {
    const sidebarItems = [
        { name: "Sites", icon: Layout },
        { name: "Deploy", icon: Rocket },
        { name: "Manage Websites", icon: GitBranch },
        { name: "AI Website", icon: Cpu },
        { name: "Search Engine", icon: Search },
        { name: "Website Templates", icon: LayoutTemplate },
    ] as any;

    const [selectedWebpage, setSelectedWebpage] = useState<Webpage | null>(null);
    const [activeTab, setActiveTab] = useState("Sites");

    const [domain, setDomain] = useState("");
    const [content, setContent] = useState("");
    return (
        <div className="min-h-screen bg-background text-gray-300">
            <div className="flex">
                <Sidebar 
                    items={sidebarItems}
                    activeItem={activeTab}
                    setActiveItem={setActiveTab}
                />
                <div className="flex-1 p-10 ml-64">
                    <h1 className="text-4xl font-bold mb-8 text-white">
                        Welcome to your dashboard!
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <Card className="bg-[#0a0a0a] border-[#18181b]">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">
                                    Total Websites
                                </CardTitle>
                                <Globe className="h-4 w-4 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">0</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#0a0a0a] border-[#18181b]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Latest Deployment
                </CardTitle>
                <Clock className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                    N/A
                  {/* {userWebpages.length > 0
                    ? new Date(
                        Math.max(
                          ...userWebpages
                            .filter((w) => w.deployments?.deployedAt)
                            .map((w) => w.deployments!.deployedAt!.getTime())
                        )
                      ).toLocaleDateString()
                    : "N/A"} */}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0a0a0a] border-[#18181b]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Total Deployments
                </CardTitle>
                <Activity className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {/* {userWebpages.filter((w) => w.deployments).length} */}
                </div>
              </CardContent>
            </Card>
                    </div>







                    
                    {activeTab === "Deploy" && (
            <>
              <Card className="bg-[#0a0a0a] border-[#18181b]">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    {selectedWebpage ? "Edit Website" : "Deploy a New Website"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="domain" className="text-lg text-gray-400">
                        Domain
                      </Label>
                      <Input
                        id="domain"
                        placeholder="Enter your domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="mt-1 bg-[#0a0a0a] text-white border-gray-700"
                        disabled={!!selectedWebpage}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="content"
                        className="text-lg text-gray-400"
                      >
                        Content
                      </Label>
                      <Textarea
                        id="content"
                        placeholder="Enter your HTML content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 min-h-[200px] font-mono text-sm bg-[#0a0a0a] text-white border-gray-700"
                      />
                    </div>
                    <Button
                    //   onClick={selectedWebpage ? handleUpdate : handleDeploy}
                    //   disabled={
                    //     isDeploying ||
                    //     !domain ||
                    //     !content ||
                    //     !isInitialized ||
                    //     userId === null
                    //   }
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-500 text-white text-md"
                    >
                        {selectedWebpage ? "Update Website" : "Deploy to H3X"}
                    </Button>

                      {/* {isDeploying ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {selectedWebpage ? "Updating..." : "Deploying..."}
                        </>
                      ) : selectedWebpage ? (
                        "Update Website"
                      ) : (
                        "Deploy to HTTP3"
                      )}
                    </Button>
                    {deploymentError && (
                      <p className="text-red-400 mt-2">{deploymentError}</p>
                    )}
                    {deployedUrl && (
                      <DeploymentVisual deployedUrl={deployedUrl} />
                    )} */}
                  </div>
                </CardContent>
              </Card>

              {content && (
                <Card className="mt-4 bg-[#0a0a0a] border-[#18181b]">
                  <CardHeader>
                    <CardTitle className="text-white">Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-[#18181b] p-4 rounded-lg">
                      <iframe
                        srcDoc={content}
                        style={{
                          width: "100%",
                          height: "400px",
                          border: "none",
                        }}
                        title="Website Preview"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

                </div>
            </div>
        </div>
    )
}