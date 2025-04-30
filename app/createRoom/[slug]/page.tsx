import CreateInviteButton from "@/components/ui/createInviteCodeButton"
import { Box } from "@mui/material"
import { createClient } from '@/utils/supabase/client';
export default async function invite({
    params,
}: {
  params: Promise<{ slug: string }>
}){
    const supabase = createClient();
    const {slug} = await params;
    const { data, error } = await supabase
            .from('InviteSlugs')
            .select('code')
            .eq('code', slug)
            .maybeSingle();
    if(data){
        return(
            <Box>
                <CreateInviteButton code={slug} isOwner={false} title=""/>
            </Box>
        );
    }
    else{
        return(
            <Box>
                <h1>Slug invalide</h1>
            </Box>
        );
    }

}