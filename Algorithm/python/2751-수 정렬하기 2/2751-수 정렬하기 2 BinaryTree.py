class node():
    def __init__(self, root, value):
        if(root == 0):
            self.root = self
        self.root = root
        self.lNode = None
        self.rNode = None
        self.value = value

    def appendNode(self, node):
        if(node.value > self.value):
            if(self.rNode == None):
                self.rNode = node
            else:
                self.rNode.appendNode(node)
        else:
            if(self.lNode == None):
                self.lNode = node
            else:
                self.lNode.appendNode(node)
    
    def printTree(self):
        if(self.lNode==None):
            result = str(self.value) + '\n'
            if(self.rNode!=None):
                result += self.rNode.printTree()
            return result
        else:
            result = self.lNode.printTree()+str(self.value) + '\n'
            if(self.rNode!=None):
                result += self.rNode.printTree()
            return result
import time

n = int(input())
tst = time.time()
a = node(0, int(input()))

for i in range(n-1):
    a.appendNode(node(a, int(input())))
s = a.printTree()
ten = time.time()

print(s[:-1])
print(ten-tst)