import Image from './Image'
import Skeleton from './Skeleton'

type CompoundedSkeletonType = typeof Skeleton & {
  Image: typeof Image
}

const CompoundedSkeleton = Skeleton as CompoundedSkeletonType

CompoundedSkeleton.Image = Image

export type { SkeletonImageProps } from './Image'

export { CompoundedSkeleton as Skeleton, Image as SkeletonImage }
export default CompoundedSkeleton
