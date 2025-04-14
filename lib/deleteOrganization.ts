'use server'

import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

export const deleteOrganization = async (organizationId: string) => {
    try {
        await clerk.organizations.deleteOrganization(organizationId);
        return { success: true, message: 'Organization deleted' };
    } catch (error) {
        console.error('Failed to delete organization', error);
        return { success: false, error: 'Unauthorized or failed to delete organization' };
    }
};
