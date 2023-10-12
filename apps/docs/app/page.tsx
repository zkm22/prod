import { PrismaClient } from "database";
import styles from "./page.module.css";

export default async function Page() {
  const client = new PrismaClient();

  async function test() {
    const a = await client.user.findMany();
    console.log(a);
    return a;
  }

  const b = await test();

  return (
    <main className={styles.main}>
      {JSON.stringify(b)}
    </main>
  );
}
