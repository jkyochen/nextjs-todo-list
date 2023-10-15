"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css'

export default function Pong() {

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getHello() {
      const resp = await fetch("/api/ping");
      const res = await resp.text();
      setMsg(res);
      setLoading(false);
    }
    getHello();
  }, [])

  if (loading) {
    return <h1 className={styles.h1}>Loading...</h1>
  }

  return <h1 className={styles.h1}>{msg}</h1>
}
