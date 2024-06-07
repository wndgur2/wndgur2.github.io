def solution(nums):
    speciesN = len(set(nums))
    l = len(nums)
    
    return l/2 if speciesN > l/2 else speciesN