import { ResolutionType } from './type';

export function detect(): ResolutionType {
    switch (true) {
        case window.innerHeight <= ResolutionType.HD:
            return ResolutionType.HD;
        case window.innerHeight > ResolutionType.HD && window.innerHeight <= ResolutionType.FULL_HD:
            return ResolutionType.FULL_HD;
        case window.innerHeight > ResolutionType.FULL_HD && window.innerHeight <= ResolutionType.TWO_K:
            return ResolutionType.TWO_K;
        case window.innerHeight > ResolutionType.TWO_K:
            return ResolutionType.FOUR_K;
        default:
            return ResolutionType.FULL_HD;
    }
}
