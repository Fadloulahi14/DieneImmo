import { useState, useEffect } from 'react';
import { getProperties, getFeaturedProperties, getPropertyById } from './api';
import type { Property } from './types';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProperties()
      .then(setProperties)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { properties, loading, error, setProperties };
}

export function useFeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProperties()
      .then(setProperties)
      .finally(() => setLoading(false));
  }, []);

  return { properties, loading };
}

export function useProperty(id: number) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPropertyById(id)
      .then(setProperty)
      .finally(() => setLoading(false));
  }, [id]);

  return { property, loading };
}
