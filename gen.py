from random import randint, uniform

def gen_flicker(class_name):
    print('@keyframes {} {{'.format(class_name))
    for i in range(0, 101):
        print('  {}% {{'.format(i))
        print('    text-shadow: {}px {}px {}px;'.format(uniform(-0.5, 0.5), uniform(-0.5, 0.5), randint(0, 3)))
        print('  }')
    print('}')

gen_flicker('text_flicker')