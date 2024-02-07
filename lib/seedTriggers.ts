import postgres from "postgres";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("Couldn't find db url");
}

const sql = postgres(dbUrl);
// create or replace function public.handle_new_user()
// returns trigger as $$
// begin
//     insert into public.user (id, email, name, profile_photo)
//     values (new.id, new.email, new.raw_user_meta_data ->> 'name', 'https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=' || (new.raw_user_meta_data ->> 'name'));
//     return new;
// end;
// $$ language plpgsql security definer;
async function main() {
  await sql`
  create or replace function public.handle_new_user()
  returns trigger as $$
  begin
      insert into public.user (id, email, name, profile_photo)
      values (
          new.id, 
          new.email, 
          COALESCE(new.raw_user_meta_data ->> 'preferred_username', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1), 'unknown'), 
          'https://www.gravatar.com/avatar/' || md5(lower(trim(new.email))) || '?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/' || COALESCE(new.raw_user_meta_data ->> 'preferred_username', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1), 'unknown') || '/128'
      );
      return new;
  end;
  $$ language plpgsql security definer;
    `;

  await sql`
        create or replace trigger on_auth_user_created
            after insert on auth.users
            for each row execute procedure public.handle_new_user();
      `;

  await sql`
        create or replace function public.handle_user_delete()
        returns trigger as $$
        begin
          delete from auth.users where id = old.id;
          return old;
        end;
        $$ language plpgsql security definer;
      `;

  await sql`
        create or replace trigger on_user_deleted
          after delete on public.user
          for each row execute procedure public.handle_user_delete()
      `;

  console.log(
    "Finished adding triggers and functions for user handling."
  );
  process.exit();
}

main();