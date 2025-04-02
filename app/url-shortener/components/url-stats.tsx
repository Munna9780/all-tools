"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ClickData = {
  date: string
  clicks: number
}

type DeviceData = {
  name: string
  value: number
}

type LocationData = {
  country: string
  clicks: number
}

type ReferrerData = {
  referrer: string
  clicks: number
}

export function UrlStats() {
  const [period, setPeriod] = useState("7d")
  const [clickData, setClickData] = useState<ClickData[]>([])
  const [deviceData, setDeviceData] = useState<DeviceData[]>([])
  const [locationData, setLocationData] = useState<LocationData[]>([])
  const [referrerData, setReferrerData] = useState<ReferrerData[]>([])
  const [totalClicks, setTotalClicks] = useState(0)
  const [uniqueVisitors, setUniqueVisitors] = useState(0)

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // This is simulated data for demonstration purposes

    // Generate click data based on selected period
    const days = period === "7d" ? 7 : period === "30d" ? 30 : 90
    const newClickData: ClickData[] = []
    let total = 0

    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const clicks = Math.floor(Math.random() * 50) + 1
      total += clicks

      newClickData.unshift({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        clicks,
      })
    }

    setClickData(newClickData)
    setTotalClicks(total)
    setUniqueVisitors(Math.floor(total * 0.7)) // Assume 70% of clicks are unique visitors

    // Generate device data
    setDeviceData([
      { name: "Desktop", value: Math.floor(Math.random() * 60) + 20 },
      { name: "Mobile", value: Math.floor(Math.random() * 40) + 10 },
      { name: "Tablet", value: Math.floor(Math.random() * 20) + 5 },
    ])

    // Generate location data
    setLocationData([
      { country: "United States", clicks: Math.floor(Math.random() * 100) + 50 },
      { country: "United Kingdom", clicks: Math.floor(Math.random() * 50) + 20 },
      { country: "Canada", clicks: Math.floor(Math.random() * 40) + 15 },
      { country: "Germany", clicks: Math.floor(Math.random() * 30) + 10 },
      { country: "France", clicks: Math.floor(Math.random() * 25) + 5 },
    ])

    // Generate referrer data
    setReferrerData([
      { referrer: "Direct", clicks: Math.floor(Math.random() * 100) + 50 },
      { referrer: "Google", clicks: Math.floor(Math.random() * 80) + 30 },
      { referrer: "Twitter", clicks: Math.floor(Math.random() * 60) + 20 },
      { referrer: "Facebook", clicks: Math.floor(Math.random() * 40) + 10 },
      { referrer: "LinkedIn", clicks: Math.floor(Math.random() * 30) + 5 },
    ])
  }, [period])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueVisitors}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Click Statistics</CardTitle>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardDescription>Number of clicks over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clickData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="devices">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="referrers">Referrers</TabsTrigger>
        </TabsList>
        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Clicks by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceData.map((device) => (
                  <div key={device.name} className="flex items-center">
                    <div className="w-1/4 font-medium">{device.name}</div>
                    <div className="w-3/4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-primary rounded-full" style={{ width: `${device.value}%` }}></div>
                        <span className="text-sm text-muted-foreground">{device.value}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle>Top Locations</CardTitle>
              <CardDescription>Clicks by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationData.map((location) => (
                  <div key={location.country} className="flex items-center justify-between">
                    <div className="font-medium">{location.country}</div>
                    <div className="text-muted-foreground">{location.clicks} clicks</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="referrers">
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
              <CardDescription>Where your clicks are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referrerData.map((referrer) => (
                  <div key={referrer.referrer} className="flex items-center justify-between">
                    <div className="font-medium">{referrer.referrer}</div>
                    <div className="text-muted-foreground">{referrer.clicks} clicks</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

