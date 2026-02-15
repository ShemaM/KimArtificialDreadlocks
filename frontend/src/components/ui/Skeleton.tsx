import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-cream-dark",
        className
      )}
    />
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function GalleryImageSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden">
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export function BookingFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <Skeleton className="h-14 w-full rounded-full" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <div className="flex gap-4">
            <Skeleton className="h-14 w-40 rounded-full" />
            <Skeleton className="h-14 w-40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
