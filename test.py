units = open("file.txt").read().split("\n")
db = []
for element in units:
	element = element.split(" ")
	if element[len(element) - 1] not in db:
		db.append(element[len(element) - 1])
for element in db:
	print(element)