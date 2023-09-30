#Clothes Search Algorithm

class Wardrobe:
    def __init__(name, dicc):
            self.owner = name
        if dicc != None and isinstance(dicc, dict):
            self.dic  dicc
        else:
            self.dic = {}
        
    def add_clothes(address, label_array):
        self.dic[address] = label_array
        print(f"New object added to f{self.owner}'s wardrobe.")
        

#add fcts for finding combinations of the detected clothes in the wardrobe, and get the one with the most recurring color pattern from the dataset images (can use a sample folder of images to try the model out, just see if it works.)
