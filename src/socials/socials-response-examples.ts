import { ApiProperty } from "@nestjs/swagger";
import { Provider } from "@supabase/supabase-js";


export class SocialSignInResponse {
	@ApiProperty({
		example: "facebook",
	  })
    provider: Provider;

	@ApiProperty({
		example: "https://api.supabase.io/auth/v1/provider/oauth?provider=facebook",
	})
    url: string | null;
}