def merge_packages(items, limit):

# U: find the first two items in the given items array that add up to equal limit - return the indices in descending order [3, 1] - last index first 
# if no combination of 2 exists, return an empty array 
# P:
    # create a dictionary with the items as keys, and their indices as values 
    # loop through the items array
        # iterate over the dictionary - if current item + the current value of the dictionary ==        target
            # return the indices 
# edgecase: two items are the same weight 
 
    d = {}
    
    for i, v in enumerate(items):
        # added conditional logic to keep the only earliest occurence of a given value 
        if v in d:
            continue
        d[v] = i 

    firstPair = []
    for i, v in enumerate(items):
        
        # added conditional logic to check we're not on the same index (same item)
        if limit - v in d and d[limit-v] != i: 
        
            if len(firstPair) > 0:
                if i < firstPair[0]:
                    firstPair = sorted([d[limit - v], i], reverse=True)
                    
            if len(firstPair) == 0:
                firstPair = sorted([d[limit - v ], i], reverse=True)
        
    print(d)
    return firstPair


print(merge_packages([5], 10))
