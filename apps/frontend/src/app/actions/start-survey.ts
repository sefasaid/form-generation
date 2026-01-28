'use server';

import { redirect } from 'next/navigation';
import { postData } from '@org/nextFetch';
import { toast } from 'sonner';
export default async function startSurveyAction(
    formData: FormData
) {
    const formId = formData.get('formId') as string;
    const data = await postData(`/forms/start`, {
        formId,
    });
    if (data?.sessionId) {
        redirect(`/${data.sessionId}/`);
    }
    toast.error('Failed to start survey');
}
