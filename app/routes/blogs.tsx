import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, Outlet } from "@remix-run/react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function BlogsLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col max-w-5xl prose dark:prose-invert">
        <Card className="border-x-1 border-y-0 border-gray-200 shadow-none rounded-none">
          <CardContent className="p-4">
            <motion.div
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  asChild
                >
                  <Link to="/blogs">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
