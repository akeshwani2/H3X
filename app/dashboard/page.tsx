"use client";
// 2:01:45
import { Activity, Clock, Cpu, GitBranch, Globe, Layout, LayoutTemplate, Loader2, Rocket, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { createWebpageWithName, getUserIdByEmail, getUserWebpages, getWebpageContent, initializeClients } from "@/utils/db/actions";
import DeploymentVisual from "@/components/DeploymentVisual";



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

    const {user, authenticated} = usePrivy()
    const [selectedWebpage, setSelectedWebpage] = useState<Webpage | null>(null);
    const [activeTab, setActiveTab] = useState("Sites");

    const [domain, setDomain] = useState("");
    const [content, setContent] = useState("");
    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentError, setDeploymentError] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [deployedUrl, setDeployedUrl] = useState("");
    const [w3name, setW3name] = useState<string | null>(null);
    const [userWebpages, setUserWebpages] = useState<Webpage[]>([]);
    
    // handle deployment type shi


    useEffect(() => {
      async function init() {
        try {
          if(authenticated && user?.email?.address) {
            console.log("Auth status:", authenticated);
            console.log("User email:", user.email.address);
            
            // Initialize clients
            await initializeClients(user.email.address);
            console.log("Clients initialized successfully");
            setIsInitialized(true);
            
            // Get user ID
            const fetchedUserId = await getUserIdByEmail(user.email.address);
            console.log("Fetched user ID:", fetchedUserId);
            setUserId(fetchedUserId);
          } else {
            console.log("Not authenticated or no email:", {
              authenticated,
              email: user?.email?.address
            });
          }
        } catch (error) {
          console.error("Initialization error:", error);
          setDeploymentError(error instanceof Error ? error.message : 'An unknown error occurred');
          setIsInitialized(false);
        }
      }

      init();
    }, [authenticated, user])

    useEffect(() => {
      async function fetchUserId() {
        if (authenticated && user?.email?.address) {
          const fetchedUserId = await getUserIdByEmail(user?.email?.address);
          console.log(fetchUserId)
          console.log(user.email.address)
          setUserId(fetchedUserId)
        }
      }
      fetchUserId()
    }, [authenticated, user])

    useEffect(() => {
      async function fetchUserWebpages() {
        if (userId) {
          const webpages = await getUserWebpages(userId);
          console.log("Fetched webpages:", webpages);
          setUserWebpages(webpages as Webpage[]);
        }
      }
      fetchUserWebpages();
    }, [userId]);

    const handleDeploy = async () => {
      setIsDeploying(true);
      setDeploymentError("");
      try {
        if (!isInitialized) {
          throw new Error("Clients not initialized");
        }
        if (userId === null) {
          throw new Error("User not authenticated or ID not found");
        }
  
        const { webpage, txHash, cid, deploymentUrl, name, w3nameUrl } =
          await createWebpageWithName(userId, domain, content);
  
        setDeployedUrl(w3nameUrl || deploymentUrl);
        setW3name(name);
        console.log(
          `Deployed successfully. Transaction hash: ${txHash}, CID: ${cid}, URL: ${
            w3nameUrl || deploymentUrl
          }, W3name: ${name}`
        );
  
        // Refresh the user's webpages
        const updatedWebpages = await getUserWebpages(userId);
        setUserWebpages(updatedWebpages as Webpage[]);
      } catch (error) {
        console.error("Deployment failed:", error);
        setDeploymentError("Deployment failed. Please try again.");
      } finally {
        setIsDeploying(false);
      }
    };

    const handleEdit = async (webpage: Webpage) => {
      setSelectedWebpage(webpage);
      setDomain(webpage.webpages.domain);
      const webpageContent = await getWebpageContent(webpage.webpages.id);
      setContent(webpageContent);
      setW3name(webpage.webpages.name);
      setActiveTab("Deploy");
    };

    return (
        <div className="min-h-screen bg-background text-gray-300">
            <div className="flex">
                <Sidebar 
                    items={sidebarItems}
                    activeItem={activeTab}
                    setActiveItem={setActiveTab}
                />
                <div className="flex-1 p-10 ml-64">
                    <h1 className="text-4xl font-bold mb-5 text-white">
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
                                <div className="text-2xl font-bold text-white">
                                    {userWebpages.length}
                                </div>
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
                  {userWebpages.length > 0
                    ? new Date(
                        Math.max(
                          ...userWebpages
                            .filter((w) => w.deployments?.deployedAt)
                            .map((w) => w.deployments!.deployedAt!.getTime())
                        )
                      ).toLocaleDateString()
                    : "N/A"}
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
                  {userWebpages.filter((w) => w.deployments).length}
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
                      onClick={handleDeploy}
                      disabled={
                        isDeploying ||
                        !domain ||
                        !content ||
                        !isInitialized ||
                        userId === null
                      }
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-500 text-white text-md"
                    >
                      {isDeploying ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Deploying...
                        </>
                      ) : (
                        "Deploy to H3X"
                      )}
                    </Button>
                    {deploymentError && (
                      <p className="text-red-400 mt-2">{deploymentError}</p>
                    )}
                    {deployedUrl && (
                      <DeploymentVisual deployedUrl={deployedUrl} />
                    )}
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