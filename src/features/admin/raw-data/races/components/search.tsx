'use client';

import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchForm() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [date, setDate] = useState(searchParams.get('date') || '');
  const [stadiumTelCode, setStadiumTelCode] = useState(
    searchParams.get('stadium_tel_code') || '',
  );

  useEffect(() => {
    setDate(searchParams.get('date') || '');
    setStadiumTelCode(searchParams.get('stadium_tel_code') || '');
  }, [searchParams]);

  const debouncedSearch = useDebouncedCallback(() => {
    const newSearchParams = new URLSearchParams();
    if (date) newSearchParams.set('date', date);
    if (stadiumTelCode) newSearchParams.set('stadium_tel_code', stadiumTelCode);

    if (date || stadiumTelCode) {
      replace(`?${newSearchParams.toString()}`);
    }
  }, 1000);

  useEffect(() => {
    debouncedSearch();
  }, [date, stadiumTelCode, debouncedSearch]);

  return (
    <form className="flex space-x-4">
      <input
        type="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-36 rounded border border-gray-300 p-2 text-sm"
      />
      {date && (
        <input
          type="number"
          value={stadiumTelCode}
          placeholder="Stadium Tel Code"
          onChange={(e) => setStadiumTelCode(e.target.value)}
          className="w-36 rounded border border-gray-300 p-2 text-sm"
          min="1"
          max="24"
        />
      )}
    </form>
  );
}
