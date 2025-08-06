import { prisma } from "@/lib/prisma"; // Your Prisma client instance
import { createClient } from "@/utils/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Now fetch the user from your own database using Prisma
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      baseResume: true, // Include the resume if needed
    },
  });

  return dbUser;
}