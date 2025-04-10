import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

export async function DELETE(req: Request) {
  try {
    const { organizationId } = await req.json();

    await clerk.organizations.deleteOrganization(organizationId);

    return new Response(JSON.stringify({ message: 'Organization deleted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting organization:', error);
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
