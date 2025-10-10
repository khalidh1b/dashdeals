import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import {
  Laptop2Icon,
  SmartphoneIcon,
  TabletIcon,
  GlobeIcon,
  MapPinIcon,
  ClockIcon,
  AlertTriangleIcon,
} from "lucide-react";
import toast from "react-hot-toast";

const loginActivities = [
    {
      id: 1,
      device: "Windows PC",
      browser: "Chrome",
      location: "New York, USA",
      ip: "192.168.1.1",
      time: "2023-06-15T14:30:00",
      status: "current",
    },
    {
      id: 2,
      device: "iPhone 13",
      browser: "Safari",
      location: "San Francisco, USA",
      ip: "192.168.1.2",
      time: "2023-06-14T10:15:00",
      status: "active",
    },
    {
      id: 3,
      device: "MacBook Pro",
      browser: "Firefox",
      location: "Chicago, USA",
      ip: "192.168.1.3",
      time: "2023-06-12T08:45:00",
      status: "active",
    },
    {
      id: 4,
      device: "iPad",
      browser: "Safari",
      location: "Toronto, Canada",
      ip: "192.168.1.4",
      time: "2023-06-10T16:20:00",
      status: "active",
    },
    {
      id: 5,
      device: "Android Phone",
      browser: "Chrome",
      location: "London, UK",
      ip: "192.168.1.5",
      time: "2023-06-05T12:10:00",
      status: "active",
    },
  ]
  
const LogActivity = () => {
    const [activities, setActivities] = useState(loginActivities);
    const [selectedSession, setSelectedSession] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        }).format(date)
    }

  const getTimeAgo = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
        return `${Math.floor(diffInSeconds / 86400)} days ago`
    }

    const getDeviceIcon = (device) => {
        if (device.includes("PC") || device.includes("Mac")) return <Laptop2Icon className="h-4 w-4" />
        if (device.includes("Phone")) return <SmartphoneIcon className="h-4 w-4" />
        if (device.includes("iPad") || device.includes("Tablet")) return <TabletIcon className="h-4 w-4" />
        return <GlobeIcon className="h-4 w-4" />
    }

    const handleSignOut = (id) => {
        setActivities(activities.filter((activity) => activity.id !== id))
        toast.error("Device signed out The session has been terminated successfully.")
    }

    const handleSignOutAll = () => {
        const currentSession = activities.find((activity) => activity.status === "current")
        setActivities(currentSession ? [currentSession] : [])
        toast.error("All other devices signed out. All other sessions have been terminated successfully.")
    }

    return (
        <>
        <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
            <div>
                <CardTitle>Login Activity</CardTitle>
                <CardDescription className="mt-1">Review all devices that have logged into your account.</CardDescription>
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button variant="outline">Sign Out All Other Devices</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sign out all other devices?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This will terminate all active sessions except for your current one. You&apos;ll need to sign in again on
                    those devices.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSignOutAll}>Sign Out All</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            </div>
        </CardHeader>
        <CardContent>
            <div className="rounded-lg border">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead className="hidden md:table-cell">Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {activities.map((activity) => (
                    <TableRow key={activity.id}>
                    <TableCell>
                        <div className="flex items-center gap-2">
                        {getDeviceIcon(activity.device)}
                        <div>
                            <div className="font-medium">{activity.device}</div>
                            <div className="text-xs text-muted-foreground">{activity.browser}</div>
                        </div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4" />
                        <div>
                            <div className="font-medium">{activity.location}</div>
                            <div className="text-xs text-muted-foreground">{activity.ip}</div>
                        </div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        <div>
                            <div className="font-medium">{formatDate(activity.time)}</div>
                            <div className="text-xs text-muted-foreground">{getTimeAgo(activity.time)}</div>
                        </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant={activity.status === "current" ? "default" : "outline"}>
                        {activity.status === "current" ? "Current" : "Active"}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedSession(activity)}>
                            Details
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Session Details</DialogTitle>
                            <DialogDescription>Detailed information about this login session.</DialogDescription>
                            </DialogHeader>
                            {selectedSession && (
                            <div className="space-y-4 py-2">
                                <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Device</h4>
                                    <p className="font-medium">{selectedSession.device}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Browser</h4>
                                    <p className="font-medium">{selectedSession.browser}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                                    <p className="font-medium">{selectedSession.location}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">IP Address</h4>
                                    <p className="font-medium">{selectedSession.ip}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Login Time</h4>
                                    <p className="font-medium">{formatDate(selectedSession.time)}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                                    <p className="font-medium capitalize">{selectedSession.status}</p>
                                </div>
                                </div>

                                {selectedSession.status !== "current" && (
                                <div className="rounded-lg border p-3 bg-amber-50 border-amber-200 flex gap-3">
                                    <AlertTriangleIcon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                    <h4 className="font-medium text-amber-800">Sign out this device?</h4>
                                    <p className="text-sm text-amber-700 mt-1">
                                        If you don&apos;t recognize this activity, sign out and change your password immediately.
                                    </p>
                                    </div>
                                </div>
                                )}
                            </div>
                            )}
                            <DialogFooter>
                            {selectedSession && selectedSession.status !== "current" && (
                                <Button
                                variant="destructive"
                                onClick={() => {
                                    handleSignOut(selectedSession.id)
                                    setSelectedSession(null)
                                }}
                                >
                                Sign Out This Device
                                </Button>
                            )}
                            </DialogFooter>
                        </DialogContent>
                        </Dialog>

                        {activity.status !== "current" && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive">
                                Sign Out
                            </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Sign out this device?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This will terminate the session on this device. The user will need to sign in again.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleSignOut(activity.id)}>Sign Out</AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        )}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
        </CardContent>
        </Card>
        </>
    );
};

export default LogActivity;